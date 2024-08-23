document.getElementById('fetchItems').addEventListener('click', async () => {
    const itemNo = document.getElementById('itemNo').value;
    const price = document.getElementById('price').value;

    // Build the GraphQL query dynamically based on user input
    let query = `
    {
        getItemsFromTexas { 
            ItemNo
            State
            Price
            Count
            Total
        }
    }`;

    if (itemNo || price) {
        query = `
        {
            getItemsFromTexas {
                ItemNo
                State
                Price
                Count
                Total
            }
        }`;

        if (itemNo) {
            query = `
            {
                getItemsFromTexas {
                    ItemNo
                    State
                    Price
                    Count
                    Total
                }
            }`;
        } else if (price) {
            query = `
            {
                getItemsFromTexas {
                    ItemNo
                    State
                    Price
                    Count
                    Total
                }
            }`;
        }
    }

    try {
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query }),
        });

        const result = await response.json();
        let items = result.data.getItemsFromTexas;

        // client-side filtering 
        if (itemNo) {
            items = items.filter(item => item.ItemNo === itemNo);
        }
        if (price) {
            items = items.filter(item => item.Price === parseFloat(price));
        }

        const itemsList = document.getElementById('itemsList');
        itemsList.innerHTML = '';

        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `Item No: ${item.ItemNo}, State: ${item.State}, Price: ${item.Price}, Count: ${item.Count}, Total: ${item.Total}`;
            itemsList.appendChild(li);
        });
    } catch (err) {
        console.error('Error fetching items:', err);
    }
});
