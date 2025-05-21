const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Journal = require('../models/Journal');

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
 */
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all journal entries');
    const entries = await Journal.find().sort({ date: -1 });
    console.log(`Found ${entries.length} entries`);
    res.json(entries);
  } catch (error) {
    console.error('Error fetching entries:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/journal/{id}:
 *   get:
 *     summary: Get a journal entry by id
 *     tags: [Journal]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The journal entry id
 *     responses:
 *       200:
 *         description: The journal entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journal'
 *       404:
 *         description: Journal entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/:id', async (req, res) => {
  try {
    console.log(`Fetching journal entry with id: ${req.params.id}`);
    const entry = await Journal.findById(req.params.id);
    if (!entry) {
      console.log('Entry not found');
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    console.log('Entry found:', entry);
    res.json(entry);
  } catch (error) {
    console.error('Error fetching entry:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/journal:
 *   post:
 *     summary: Create a new journal entry
 *     tags: [Journal]
 *     security:
 *       - cors: []
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
 *                 maxLength: 100
 *               content:
 *                 type: string
 *                 description: The content of the journal entry
 *               mood:
 *                 type: string
 *                 description: The mood associated with the entry
 *                 enum:
 *                   # Positive moods
 *                   - happy
 *                   - joyful
 *                   - excited
 *                   - enthusiastic
 *                   - grateful
 *                   - peaceful
 *                   - content
 *                   - energetic
 *                   - inspired
 *                   - proud
 *                   - optimistic
 *                   - relaxed
 *                   - motivated
 *                   - confident
 *                   - cheerful
 *                   - loved
 *                   - blessed
 *                   - accomplished
 *                   # Neutral moods
 *                   - neutral
 *                   - calm
 *                   - focused
 *                   - thoughtful
 *                   - contemplative
 *                   - balanced
 *                   - mindful
 *                   - present
 *                   - centered
 *                   - curious
 *                   - reflective
 *                   # Challenging moods
 *                   - sad
 *                   - angry
 *                   - frustrated
 *                   - anxious
 *                   - stressed
 *                   - tired
 *                   - overwhelmed
 *                   - disappointed
 *                   - worried
 *                   - confused
 *                   - lonely
 *                   - nervous
 *                   - irritable
 *                   - restless
 *                   - melancholy
 *                   - exhausted
 *     responses:
 *       201:
 *         description: The created journal entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journal'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       403:
 *         description: CORS error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/', [
  body('title').trim().notEmpty().withMessage('Title is required')
    .isLength({ max: 100 }).withMessage('Title cannot be more than 100 characters'),
  body('content').trim().notEmpty().withMessage('Content is required'),
  body('mood').optional().isIn(['happy', 'sad', 'neutral', 'excited', 'angry'])
    .withMessage('Invalid mood value')
], async (req, res) => {
  try {
    console.log('Creating new journal entry:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const entry = new Journal(req.body);
    await entry.save();
    console.log('Entry created successfully:', entry);
    res.status(201).json(entry);
  } catch (error) {
    console.error('Error creating entry:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/journal/{id}:
 *   put:
 *     summary: Update a journal entry
 *     tags: [Journal]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The journal entry id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the journal entry
 *               content:
 *                 type: string
 *                 description: The content of the journal entry
 *               mood:
 *                 type: string
 *                 enum: [happy, sad, neutral, excited, angry]
 *                 description: The mood associated with the entry
 *     responses:
 *       200:
 *         description: The updated journal entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Journal'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *       404:
 *         description: Journal entry not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.put('/:id', [
  body('title').optional().trim().isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  body('content').optional().trim(),
  body('mood').optional().isIn(['happy', 'sad', 'neutral', 'excited', 'angry'])
    .withMessage('Invalid mood value')
], async (req, res) => {
  try {
    console.log(`Updating journal entry with id: ${req.params.id}`);
    console.log('Update data:', req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const entry = await Journal.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!entry) {
      console.log('Entry not found for update');
      return res.status(404).json({ error: 'Journal entry not found' });
    }

    console.log('Entry updated successfully:', entry);
    res.json(entry);
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * @swagger
 * /api/journal/{id}:
 *   delete:
 *     summary: Delete a journal entry
 *     tags: [Journal]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The journal entry id
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete('/:id', async (req, res) => {
  try {
    console.log(`Deleting journal entry with id: ${req.params.id}`);
    const entry = await Journal.findByIdAndDelete(req.params.id);
    if (!entry) {
      console.log('Entry not found for deletion');
      return res.status(404).json({ error: 'Journal entry not found' });
    }
    console.log('Entry deleted successfully');
    res.json({ message: 'Journal entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting entry:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router; 