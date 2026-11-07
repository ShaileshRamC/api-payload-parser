import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/webhook', (req: Request, res: Response) => {
    try {
        const payload = req.body;

        if (!payload || Object.keys(payload).length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'Empty payload received'
            });
        }

        console.log(`[${new Date().toISOString()}] Webhook received:`, JSON.stringify(payload, null, 2));

        return res.status(200).json({
            status: 'success',
            message: 'Webhook processed successfully'
        });

    } catch (error) {
        console.error('Error processing webhook:', error);
        return res.status(500).json({
            status: 'error',
            message: 'Internal server error'
        });
    }
});

app.get('/health', (req: Request, res: Response) => {
    res.status(200).send('Webhook listener is active.');
});

app.listen(PORT, () => {
    console.log(`Webhook listener running on port ${PORT}`);
});
