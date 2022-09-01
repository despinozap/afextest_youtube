const AWS = require('aws-sdk');

// Setup DynamoDB
const documentClient = new AWS.DynamoDB.DocumentClient(
    {
        region: 'us-east-1'
    }
);

// Function to delete video in DB
const deleteYoutubeVideo = async ({ id }) => {
    
    const params = {
        TableName: 'videos',
        Key: {
            id: id
        }
    };
    
    try
    {
        await documentClient.delete(params)
        .promise();
        
        return true;
    }
    catch(ex)
    {
        return false;
    }
}


// Main function
exports.handler = async (event) => {
    
    let response;
    
    // Params validation
    if(!event.id)
    {
         response = {
            statusCode: 400,
            body: JSON.stringify(
                {
                    error: {
                        message: "Video's ID not present."        
                    }
                }
            )
        };
    }
    // All validations passed
    else
    {
        const deleted = await deleteYoutubeVideo(
            {
                id: event.id
            }
        );
        
        if(deleted)
        {
            response = {
                statusCode: 200
            };
        }
        else
        {
            response = {
                statusCode: 500,
                body: JSON.stringify(
                    {
                        error: {
                            message: "Fail on deleting video."        
                        }
                    }
                )
            };
        }
    }
    
    return response;
};
