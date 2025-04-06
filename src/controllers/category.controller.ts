import { Request, Response } from "express";
import Category from "../models/category.model";

const buildTree = (categories: any[], parent: any = null): any[] => {
  return categories
    .filter((cat) => String(cat.parent) === String(parent))
    .map((cat) => ({
      ...cat.toObject(),
      children: buildTree(categories, cat._id),
    }));
};

const deactivateSubcategories = async (parentId: string) => {
  const subcategories = await Category.find({ parent: parentId });

  for (const sub of subcategories) {
    if (sub.status !== "inactive") {
      sub.status = "inactive";
      await sub.save();
    }

    await deactivateSubcategories(sub._id.toString());
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, parent } = req.body;

    const category = new Category({
      name,
      parent: parent || null,
      status: req?.body?.status || "active",
    });

    const saved = await category.save();

    res.status(201).json({
      message: "Category created successfully",
      category: saved,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create category", details: err });
  }
};

export const getCategoryTree = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    const tree = buildTree(categories);
    res.json(tree);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories", details: err });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, parent, status } = req.body;

    const updated = await Category.findByIdAndUpdate(
      id,
      { name, parent: parent || null, status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Category not found" });

    // If status is being set to 'inactive', update all subcategories recursively
    if (status === "inactive") {
      await deactivateSubcategories(id);
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update category", details: err });
  }
};

// Delete category and reassign its subcategories
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category) return res.status(404).json({ error: "Category not found" });

    await Category.updateMany({ parent: id }, { parent: category.parent });
    await Category.findByIdAndDelete(id);
    res.json({ message: "Category deleted and children reassigned" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete category", details: err });
  }
};
