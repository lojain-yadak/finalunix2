pipeline {
    agent any
triggers {
    githubPush()
        pollSCM('H/5 * * * *')
    }
    stages {
        stage('Build and Run Docker') {
            steps {
                sh '''
                docker stop restaurant-container || true
                docker rm restaurant-container || true

                docker build -t restaurant-app .
                docker run -d --network host --name restaurant-container restaurant-app
                '''
            }
        }
    }
}
