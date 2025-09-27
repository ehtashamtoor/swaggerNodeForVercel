const Member = require("../models/Member");

const addMember = async ({ name, parentId }) => {
  const newMember = new Member({ name, parentId });
  await newMember.save();

  const pointsToDistribute = 30;
  const pointsPerLevel = 10;
  let currentParentId = parentId;
  let level = 0;
  let remainingPoints = pointsToDistribute;

  while (currentParentId && level < 10 && remainingPoints > 0) {
    const parent = await Member.findById(currentParentId);

    if (!parent) break;

    parent.points += pointsPerLevel;
    await parent.save();

    remainingPoints -= pointsPerLevel;
    currentParentId = parent.parentId;
    level++;
  }

  newMember.wastedPoints = remainingPoints;
  await newMember.save();

  return newMember;
};

const buildTree = async (memberId) => {
  const member = await Member.findById(memberId).lean();
  if (!member) return null;

  const children = await Member.find({ parentId: member._id }).lean();
  const childTrees = await Promise.all(children.map((c) => buildTree(c._id)));

  return {
    ...member,
    children: childTrees,
  };
};

const getFullTree = async () => {
  const roots = await Member.find({ parentId: null }).lean();
  const tree = await Promise.all(roots.map((r) => buildTree(r._id)));
  return tree;
};

const getMemberById = async (id) => {
  return Member.findById(id).lean();
};

const updateMember = async (id, updates) => {
  const member = await Member.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  });
  return member;
};

const deleteMember = async (id) => {
  const member = await Member.findById(id);
  if (!member) return null;

  await Member.deleteMany({ parentId: id });

  await Member.findByIdAndDelete(id);

  return member;
};

const getStats = async () => {
  const totalMembers = await Member.countDocuments();
  const members = await Member.find().lean();

  const totalPointsDistributed = members.reduce(
    (sum, m) => sum + (m.points || 0),
    0
  );

  const totalPointsWasted = members.reduce(
    (sum, m) => sum + (m.wastedPoints || 0),
    0
  );

  return {
    totalMembers,
    totalPointsDistributed,
    totalPointsWasted,
  };
};

module.exports = {
  addMember,
  getFullTree,
  getMemberById,
  getStats,
  updateMember,
  deleteMember,
};
