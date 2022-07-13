
#!/bin/sh

#echo "Configure npm..."
#mkdir package && cd package
#echo "registry = $REGISTRY" >> ~/.npmrc
#AUTH=$(echo -ne "$JB_SPACE_CLIENT_ID:$JB_SPACE_CLIENT_SECRET" | base64 | tr -d \\n)
#echo "_auth = $AUTH" >> ~/.npmrc
#echo "email = mail@mail.com" >> ~/.npmrc
#echo "always-auth = true" >> ~/.npmrc

#echo "Publish package..."
#VERSION="0.0.$JB_SPACE_EXECUTION_NUMBER"
#npm config set init.version $VERSION
#npm init -y
#npm publish --registry $REGISTRY
