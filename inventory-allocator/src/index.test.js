const InventoryAllocator = require('./index');

const mockShipments = { "apple": 3, "orange": 2, "banana": 3, "papaya": 4 };
const mockInventoryDistribution = [
    {
        name: "STORE A",
        inventory: {
            "apple": 1,
            "papaya": 30
        }
    },
    {
        name: "STORE B",
        inventory: {
            "apple": 4,
            "orange": 33,
            "banana": 544
        }
    }
];


describe('Inventory Allocator', () => {
    
    let shipments = {};
    let inventoryDistribution = [];

    beforeEach(() => {
        shipments = Object.assign({}, mockShipments);
        inventoryDistribution = JSON.parse(JSON.stringify([...mockInventoryDistribution]));
    });

    it('Processes a valid shipment with all items in inventory', () => {
        expect(InventoryAllocator(shipments, inventoryDistribution)).toEqual([
            { 'STORE A': { apple: 1, papaya: 4 } },
            { 'STORE B': { apple: 2, orange: 2, banana: 3 } }
        ]);
    });

    it('Does not process an order with a few items not in inventory', () => {
        shipments = Object.assign({}, shipments, { "Kiwi": 3 });
        expect(InventoryAllocator(shipments, inventoryDistribution)).toEqual([]);
    });

    it('Does not process an order for items with negative quantity (Shipment)', () => {
        shipments = Object.assign({}, shipments, { "apple": -3 });
        expect(InventoryAllocator(shipments, inventoryDistribution)).toEqual([]);
    });

    it('Does not process an order for items with negative quantity (Inventory)', () => {
        inventoryDistribution[1].inventory.banana = -4;
        expect(InventoryAllocator(shipments, inventoryDistribution)).toEqual([]);

    });

});