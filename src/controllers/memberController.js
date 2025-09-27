const memberService = require("../services/memberService");

const addMember = async (req, res, next) => {
  try {
    const { name, parentId } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const member = await memberService.addMember({ name, parentId });
    res.status(201).json(member);
  } catch (error) {
    next(error);
  }
};

const getTree = async (req, res, next) => {
  try {
    const tree = await memberService.getFullTree();
    res.json(tree);
  } catch (error) {
    next(error);
  }
};

const getMember = async (req, res, next) => {
  try {
    const member = await memberService.getMemberById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: "Member not found" });
    }
    res.json(member);
  } catch (error) {
    next(error);
  }
};

const updateMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const updatedMember = await memberService.updateMember(id, { name });
    if (!updatedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json(updatedMember);
  } catch (error) {
    next(error);
  }
};

const deleteMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedMember = await memberService.deleteMember(id);

    if (!deletedMember) {
      return res.status(404).json({ message: "Member not found" });
    }

    res.json({ message: "Member deleted successfully", member: deletedMember });
  } catch (error) {
    next(error);
  }
};

const getStats = async (req, res, next) => {
  try {
    const stats = await memberService.getStats();
    res.json(stats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addMember,
  getTree,
  getMember,
  getStats,
  updateMember,
  deleteMember,
};
