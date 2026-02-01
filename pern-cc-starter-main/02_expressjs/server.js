import express from 'express';
const app = express();  
const PORT = 3000;
const router = express.Router();

app.use(express.json());
let cars = [
    {id: 1, make: "Toyota", model: "Camry", year: 2022, price: 28000},
    {id: 2, make: "Tesla", model: "Model S", year: 2023, price: 25000},
    {id: 3, make: "Ford", model: "F-150", year: 2021, price: 35000},
]
router.get("/", (req, res) => {
    res.send("Hello from Car API!");
});

router.get("/", (req, res) => {
    res.send("All cars");   
});

router.post('/',(req, res) => {
    res.send("Create a new car");
})

router.put('/:id', (req, res) => {
    res.send("Update a car");
})

router.delete('/:id', (req, res) => {
    res.send("Delete  a car");
})

router.get('/:id', (req, res) => {
    res.send("Get a car");
})

app.use('/api/v1', router);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));