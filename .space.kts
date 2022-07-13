job("Build and push Docker") {
    docker {
        build {
            context = "docker"
            file = "./dockerfile"
            labels["vendor"] = "mycompany"
            args["HTTP_PROXY"] = "http://10.20.30.1:123"
        }

        push("mycompany.registry.jetbrains.space/p/mp/mydocker/myimage") {
            tags("version1.0")
        }
    }
}