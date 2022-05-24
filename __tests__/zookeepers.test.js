const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper,
} = require("../lib/zookeepers");
const { zookeepers } = require("../data/zookeepers");
jest.mock("fs");

test("creates an zookeeper object", () => {
    const zookeeper = createNewZookeeper(
        {name: "Villager", id: "egiwgieh"},
        zookeepers
    );

    expect(zookeeper.name).toBe("Villager");
    expect(zookeeper.id).toBe("egiwgieh")
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "3",
            name: "Erica",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "4",
            name: "Noel",
            age: 67,
            favoriteAnimal: "bear",
        }
    ];
    const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test("finds by id", () =>{
    const startingZookeepers = [
        {
            id: "3",
            name: "Erica",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "4",
            name: "Noel",
            age: 67,
            favoriteAnimal: "bear",
        }
    ];
    const result = findById("3", startingZookeepers);

    expect(result.name).toBe("Erica");
});

test("validates age", () => {
    const zookeeper =  {
            id: "3",
            name: "Erica",
            age: 31,
            favoriteAnimal: "penguin",
        };

    const invalidZookeeper = {
            id: "4",
            name: "Noel",
            age: "67",
            favoriteAnimal: "bear",
        }
    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});