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

// Function to store video in DB
const storeYoutubeVideo = async ({ id }) => {
    
    const params = {
        TableName: 'videos',
        Item: {
            id: id,
            created: String(Date.now())
        },
    };
    
    try
    {
        await documentClient.put(params)
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
    if(!event.url)
    {
         response = {
            statusCode: 400,
            body: JSON.stringify(
                {
                    error: {
                        message: "Video's URL not present."        
                    }
                }
            )
        };
    }
    else
    {
        // Validate Youtube URL
        const reUrl = /(http)(s)?(\:\/\/www.youtube.com\/watch\?v=)([A-z0-9])+/g;
        if(event.url.toLowerCase().match(reUrl))
        {
            const reId = /(v|V)(=)([A-z0-9])+/g;
            const matchId = event.url.match(reId);
            
            // If ID was matched
            if(matchId)
            {
                /**
                 *  It takes the same ID as Youtube
                 *  from V param in URL.
                 */
                const id = matchId[0].replace('v=', '');
                
                // Check if video already exists
                const video = await getYoutubeVideo(
                    {
                        id: id
                    }
                );
            
                // If video doesn't exist in DB
                if(video === null)
                {
                    const stored = await storeYoutubeVideo(
                        {
                            id: id
                        }
                    );
                    
                    if(stored)
                    {
                        response = {
                            statusCode: 201,
                            body: JSON.stringify(
                                {
                                    data: {
                                        id: id
                                    }
                                }
                            )
                        };
                    }
                    else
                    {
                        response = {
                            statusCode: 500,
                            body: JSON.stringify(
                                {
                                    error: {
                                        message: "Fail on saving video."        
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
                                    message: "The given video already exists."        
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
                                message: "The given Youtube video URL is invalid."        
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
                            message: "The given Youtube video URL is invalid."        
                        }
                    }
                )
            };
        }
    }
    
    return response;
};