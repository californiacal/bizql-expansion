const products = [];

module.exports = {
    Query: {},
    Mutation: {}
};

const getProducts = () => {
    // returns products as an array
    return Promise.resolve(products);
}
module.exports = {
    Query: {
        prodcuts: async () => getProducts
    },
    Mutation: {}
};

const getProductById = ({ productId }) => {
    return Promise.resolve(products.find(p => p.id === productId));
}
module.exports = {
    Query: {
        products: async () => getProducts,
        product: async (_, { id }) => getProductById({ productId: id })
    },
    Mutation: {}
};

const createProduct = ({ product }) => {
    const newId = products.length === 0 ? 1 : products[products.length - 1].id + 1;
    products = [...products, { ...product, id: newId }];
    return Promise.resolve('success');
}
module.exports = {
    Query: {
        products: async () => getProducts,
        product: async (_, { id }) => getProductById({ productId: id })
    },
    Mutation: {
        createProduct: async (_, { product }) => createProduct({ product })
    }
};