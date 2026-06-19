import generate from '../../lib/contentGenerators'

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { type, business, options } = req.body

  if (!type || !['post', 'reply', 'flyer', 'text'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type. Must be post, reply, flyer, or text.' })
  }

  const result = generate(type, business || {}, options || {})

  res.status(200).json({ success: true, data: result })
}
