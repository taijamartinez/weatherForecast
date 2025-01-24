import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  try {
  // TODO: GET weather data from city name
  // TODO: save city to search history
  console.log(req.body);
    res.status(200).json({ message: 'Weather data retrieved successfully' });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
      res.status(200).json({ message: 'History data retrieved successfully' });
    }
    catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error retrieving history data' });
    }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, res: Response) => {
  try {
    res.status(200).json({ message: 'History data deleted successfully' });
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting history data' });
  }
});

export default router;
