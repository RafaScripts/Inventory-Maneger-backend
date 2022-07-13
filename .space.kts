job("Build and push Docker") {
    docker {
        build {
            context = "docker"
            file = "./dockerfile"
            labels["vendor"] = "mycompany"
            args["HTTP_PROXY"] = "http://10.20.30.1:123"
        }

        push("digitalmoon.registry.jetbrains.space/p/syspos/mydocker") {
            tags("version1.0")
        }
    }
}

/*job("Run npm test and publish") {
    container(displayName = "Run publish script", image = "node:14-alpine") {
        env["REGISTRY"] = "https://npm.pkg.jetbrains.space/mycompany/p/projectkey/mynpm"
        shellScript {
            interpreter = "/bin/sh"
            content = """
                echo Install npm dependencies...
                npm ci
                echo Run build if it exists in package.json...
                npm run build --if-present
                echo Run tests...
                npm run test
                echo Run publishing...
                chmod +x ./publish.sh
                ./publish.sh
            """
        }
    }
}*/