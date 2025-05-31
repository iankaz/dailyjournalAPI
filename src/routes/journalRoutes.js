const express = require('express');
const router = express.Router();
const { body, validationResult, param } = require('express-validator');
const mongoose = require('mongoose');
const journalController = require('../controllers/journalController');
const auth = require('../middleware/auth');

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
 *     summary: Get all journal entries
 *     tags: [Journal]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of journal entries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Journal'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new journal entry
 *     tags: [Journal]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the journal entry
 *                 example: "happy hunting"
 *               content:
 *                 type: string
 *                 description: The content of the journal entry
 *                 example: "we went on a deer hunt today"
 *               mood:
 *                 type: string
 *                 description: The mood associated with the entry
 *                 enum: [
 *                   'happy', 'joyful', 'excited', 'enthusiastic', 'grateful', 'peaceful',
 *                   'content', 'energetic', 'inspired', 'proud', 'optimistic', 'relaxed',
 *                   'motivated', 'confident', 'cheerful', 'loved', 'blessed', 'accomplished',
 *                   'neutral', 'calm', 'focused', 'thoughtful', 'contemplative', 'balanced',
 *                   'mindful', 'present', 'centered', 'curious', 'reflective',
 *                   'sad', 'angry', 'frustrated', 'anxious', 'stressed', 'tired',
 *                   'overwhelmed', 'disappointed', 'worried', 'confused', 'lonely',
 *                   'nervous', 'irritable', 'restless', 'melancholy', 'exhausted'
 *                 ]
 *                 example: "excited"
 *     responses:
 *       201:
 *         description: Journal entry created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journal'
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 * 
 * /api/journal/{id}:
 *   get:
 *     summary: Get a journal entry by ID
 *     tags: [Journal]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Journal entry not found
 *       500:
 *         description: Server error
 * 
 *   put:
 *     summary: Update a journal entry
 *     tags: [Journal]
 *     security:
 *       - bearerAuth: []
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
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Journal entry not found
 *       500:
 *         description: Server error
 * 
 *   delete:
 *     summary: Delete a journal entry
 *     tags: [Journal]
 *     security:
 *       - bearerAuth: []
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Journal entry not found
 *       500:
 *         description: Server error
 */

// Validation middleware
const validateJournal = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title must be less than 100 characters'),
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

// MongoDB ObjectId validation middleware
const validateObjectId = [
  param('id')
    .custom((value) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid journal entry ID');
      }
      return true;
    })
];

// Middleware to handle validation results
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log('Validation errors:', errors.array());
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Routes
router.route('/')
  .get(auth, journalController.getAllEntries)
  .post(auth, validateJournal, handleValidationErrors, journalController.createEntry);

router.route('/:id')
  .get(auth, validateObjectId, journalController.getEntryById)
  .put(auth, [...validateObjectId, ...validateJournal], handleValidationErrors, journalController.updateEntry)
  .delete(auth, validateObjectId, journalController.deleteEntry);

module.exports = router; 