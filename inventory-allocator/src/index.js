const InventoryAllocator = (shipments = {}, inventoryDistribution = []) => {

    const cheapestShipment = [];
    const itemsRemaining = { ...shipments }
    const warehouses = [...inventoryDistribution];

    warehouses.forEach(({ name, inventory }) => {

        const cart = {};

        for (let item in itemsRemaining) {

            if (inventory[item] && inventory[item] > 0 && itemsRemaining[item] > 0) {
                const quantity = Math.min(inventory[item], itemsRemaining[item]);
                inventory[item] -= quantity;
                itemsRemaining[item] -= quantity;
                cart[item] = quantity;
                if (itemsRemaining[item] == 0) delete itemsRemaining[item];
            }
        }

        if (Object.keys(cart).length != 0) cheapestShipment.push({ [name]: cart });
    })

    return (Object.keys(itemsRemaining).length == 0 ? cheapestShipment : []);
}

module.exports = InventoryAllocator;
