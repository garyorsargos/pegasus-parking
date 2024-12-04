
const createApiResponse = (success, type = null, message = null, data = null) => 
{

    const response = { success, data };

    if (message) 
    {
        response.message = { type, message };
    }

    return response;
    
};

module.exports = createApiResponse;