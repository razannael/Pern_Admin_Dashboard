import express from 'express';
const app = express();  
const PORT = 3000;
const router = express.Router();

app.use(express.json());

app.use((req,res,next) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    next();
});
let cars = [
    {id: 1, make: "Toyota", model: "Camry", year: 2022, price: 28000},
    {id: 2, make: "Tesla", model: "Model S", year: 2023, price: 25000},
    {id: 3, make: "Ford", model: "F-150", year: 2021, price: 35000},
]
app.get('/', (req, res) => {
    res.send("Hello from Car API!");
});

router.get("/", (req, res) => {
    res.json(cars);   
});

router.get('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car= cars.find((car) => car.id === id);

    if(!car)return res.status(404).send("Car not found");
    res.json(car);
})

router.post('/',(req, res) => {
    const { make, model, year, price } = req.body;
    if (!make || !model || !year || !price) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const newCar = { id: cars.length + 1, make, model, year, price };
    cars.push(newCar);
    res.status(201).json(newCar);
})

router.put('/:id', (req, res) => {
    const id = Number(req.params.id);
    const car = cars.find((car) => car.id === id);
    if (!car) {
        return res.status(404).json({ error: "Car not found" });
    }
    const { make, model, year, price } = req.body;
    if (make) car.make = make;
    if (model) car.model = model;
    if (year) car.year = parseInt(year);
    if (price) car.price = parseFloat(price);
    res.json(car);
})

router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);
    const carIndex = cars.findIndex((car) => car.id === id);
    if (carIndex === -1) {
        return res.status(404).json({ error: "Car not found" });
    }
    cars.splice(carIndex, 1);
    res.json({ message: "Car deleted successfully" });
 
})



app.use('/api/v1', router);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));