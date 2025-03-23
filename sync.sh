echo "--- Building Project ---"

NODE_ENV=production
yarn build

echo "--- Project Built ---"
echo "--- Syncing with S3 Bucket ---"

aws s3 sync ./dist s3://musicnotes.pallascreations.com --delete

cloudfront_id=E1DZUXHF10LZKS 

output=$(aws cloudfront create-invalidation --distribution-id $cloudfront_id --paths "/*")
id=$(echo $output | jq -r ".Invalidation.Id")
status=$(echo $output | jq -r ".Invalidation.Status")

echo "--- Invalidating CloundFront Distribution ---"
echo "Status: $status"

while [ $(echo $output | jq -r ".Invalidation.Status") != "Completed" ]
do
    sleep 5
    output=$(aws cloudfront get-invalidation --distribution-id $cloudfront_id --id $id)
    status=$(echo $output | jq -r ".Invalidation.Status")
    echo "Status: $status"
done

echo "--- Deployment Complete ---"
