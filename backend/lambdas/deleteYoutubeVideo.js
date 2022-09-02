const AWS = require('aws-sdk');

// Setup DynamoDB
const documentClient = new AWS.DynamoDB.DocumentClient(
    {
        region: 'us-east-1'
    }
);

// Function to get a video by ID from DB
const getYoutubeVideo = async ({ id }) => {
    
    const params = {
        TableName: 'videos',
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
            ":id": id
        }
    };
    
    try
    {
        const data = await documentClient.query(params)
        .promise();
     
        // Get video if exists
        const video = (data.Count > 0) ? data.Items[0] : null;
        
        return video;
    }
    catch(ex)
    {
        return null;
    }
}

// Function to delete video in DB
const deleteYoutubeVideo = async ({ id, created }) => {

    const params = {
        TableName: 'videos',
        Key: {
            id: id,
            created: created
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
    else
    {
        const video = await getYoutubeVideo(
            {
                id: event.id
            }
        );
        
        // If video exists
        if(video !== null)
        {
            const deleted = await deleteYoutubeVideo(
                {
                    id: video.id,
                    created: video.created
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
        else
        {
            response = {
                statusCode: 400,
                body: JSON.stringify(
                    {
                        error: {
                            message: "Video not found."        
                        }
                    }
                )
            };
        }
    }
    
    return response;
};