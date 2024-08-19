let products = [];

const getProducts = () => {
    return products;
};

const getProductById = ({ productId }) => {
    return products.find(p => p.id === productId);
};

const createProduct = ({ product }) => {
    const newId = products.length === 0 ? 1 : products[products.length - 1].id + 1;
    const newProduct = { ...product, id: newId };
    products.push(newProduct); 
    return newProduct; 
};

module.exports = {
    Query: {
        products: async () => getProducts(),
        product: async (_, { id }) => getProductById({ productId: id })
    },
    Mutation: {
        createProduct: async (_, { product }) => createProduct({ product })
    }
};
