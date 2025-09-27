const express = require("express");
const router = express.Router();
const memberController = require("../controllers/memberController");

/**
 * @swagger
 * tags:
 *   name: Members
 *   description: Family tree member management
 */

/**
 * @swagger
 * /members:
 *   post:
 *     summary: Add a new member
 *     tags: [Members]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               parentId:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Member created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", memberController.addMember);

/**
 * @swagger
 * /members/tree:
 *   get:
 *     summary: Get full family tree
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Family tree data
 */
router.get("/tree", memberController.getTree);

/**
 * @swagger
 * /members/stats:
 *   get:
 *     summary: Get statistics of family tree
 *     tags: [Members]
 *     responses:
 *       200:
 *         description: Stats data
 */
router.get("/stats", memberController.getStats);

/**
 * @swagger
 * /members/{id}:
 *   get:
 *     summary: Get member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ObjectId of the member
 *     responses:
 *       200:
 *         description: Member data
 *       404:
 *         description: Member not found
 */
router.get("/:id", memberController.getMember);

/**
 * @swagger
 * /members/{id}:
 *   put:
 *     summary: Update member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Member ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member updated
 */
router.put("/:id", memberController.updateMember);

/**
 * @swagger
 * /members/{id}:
 *   delete:
 *     summary: Delete member by ID
 *     tags: [Members]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Member ID
 *     responses:
 *       200:
 *         description: Member deleted
 */
router.delete("/:id", memberController.deleteMember);

module.exports = router;
