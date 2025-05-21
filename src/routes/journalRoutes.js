const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const journalController = require('../controllers/journalController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Journal:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the journal entry
 *         title:
 *           type: string
 *           description: The title of the journal entry
 *           maxLength: 100
 *         content:
 *           type: string
 *           description: The content of the journal entry
 *         mood:
 *           type: string
 *           description: The mood associated with the entry
 *           enum:
 *             # Positive moods
 *             - happy
 *             - joyful
 *             - excited
 *             - enthusiastic
 *             - grateful
 *             - peaceful
 *             - content
 *             - energetic
 *             - inspired
 *             - proud
 *             - optimistic
 *             - relaxed
 *             - motivated
 *             - confident
 *             - cheerful
 *             - loved
 *             - blessed
 *             - accomplished
 *             # Neutral moods
 *             - neutral
 *             - calm
 *             - focused
 *             - thoughtful
 *             - contemplative
 *             - balanced
 *             - mindful
 *             - present
 *             - centered
 *             - curious
 *             - reflective
 *             # Challenging moods
 *             - sad
 *             - angry
 *             - frustrated
 *             - anxious
 *             - stressed
 *             - tired
 *             - overwhelmed
 *             - disappointed
 *             - worried
 *             - confused
 *             - lonely
 *             - nervous
 *             - irritable
 *             - restless
 *             - melancholy
 *             - exhausted
 *           default: neutral
 *         date:
 *           type: string
 *           format: date-time
 *           description: The date of the entry
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The last update timestamp
 */

/**
 * @swagger
 * servers:
 *   - url: https://cse341-rlcp.onrender.com
 *     description: Production server
 *   - url: http://localhost:3000
 *     description: Local development server
 *   - url: http://localhost:3001
 *     description: Alternative local server (port 3001)
 *   - url: http://localhost:3002
 *     description: Alternative local server (port 3002)
 *   - url: http://localhost:3003
 *     description: Alternative local server (port 3003)
 *   - url: http://localhost:3004
 *     description: Alternative local server (port 3004)
 *   - url: http://localhost:3005
 *     description: Alternative local server (port 3005)
 */

/**
 * @swagger
 * /api/journal:
 *   get:
 *     summary: Returns all journal entries
 *     tags: [Journal]
 *     responses:
 *       200:
 *         description: List of journal entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Journal'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *   post:
 *     summary: Create a new journal entry
 *     tags: [Journal]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Journal'
 *     responses:
 *       201:
 *         description: Journal entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journal'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *       500:
 *         description: Server error
 * 
 * /api/journal/{id}:
 *   get:
 *     summary: Get a journal entry by ID
 *     tags: [Journal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Journal entry ID
 *     responses:
 *       200:
 *         description: Journal entry found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journal'
 *       404:
 *         description: Journal entry not found
 *       500:
 *         description: Server error
 * 
 *   put:
 *     summary: Update a journal entry
 *     tags: [Journal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Journal entry ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Journal'
 *     responses:
 *       200:
 *         description: Journal entry updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journal'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Journal entry not found
 *       500:
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete a journal entry
 *     tags: [Journal]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Journal entry ID
 *     responses:
 *       200:
 *         description: Journal entry deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Journal entry not found
 *       500:
 *         description: Server error
 */

// Validation middleware
const validateJournalEntry = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('mood')
    .optional()
    .isIn([
      'happy', 'joyful', 'excited', 'enthusiastic', 'grateful', 'peaceful',
      'content', 'energetic', 'inspired', 'proud', 'optimistic', 'relaxed',
      'motivated', 'confident', 'cheerful', 'loved', 'blessed', 'accomplished',
      'neutral', 'calm', 'focused', 'thoughtful', 'contemplative', 'balanced',
      'mindful', 'present', 'centered', 'curious', 'reflective',
      'sad', 'angry', 'frustrated', 'anxious', 'stressed', 'tired',
      'overwhelmed', 'disappointed', 'worried', 'confused', 'lonely',
      'nervous', 'irritable', 'restless', 'melancholy', 'exhausted'
    ])
    .withMessage('Invalid mood value')
];

// Routes
router.get('/', journalController.getAllEntries);
router.get('/:id', journalController.getEntryById);
router.post('/', validateJournalEntry, journalController.createEntry);
router.put('/:id', validateJournalEntry, journalController.updateEntry);
router.delete('/:id', journalController.deleteEntry);

module.exports = router; 