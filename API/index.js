import { createClerkClient } from '@clerk/backend';
import 'dotenv/config';
import express from 'express';

const app = express()
const port = 3000
const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Trakcal API')
})

app.post('/clerk/webhooks/signup', async (req, res) => {
    const body = req.body;
    const userId = body.data.id
    
    await clerkClient.users.updateUserMetadata(userId, {
        publicMetadata: {
            hasCompletedOnboarding: false,
        },
    })

    await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: {
            isPaid: false,
        }
    })

    console.log(body);
    console.log(userId);
    res.send('info recived!!!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
