// Building docker image and pushing to dockerhub
pipeline {
    agent any
    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
        APP_NAME = "mern-frontend"
        IMAGE_TAG = "v4.0"
    }
    stages {
        stage('Build') {
            steps {
                echo 'Building the app'
                dir('client') {
                    sh "docker build -t ${DOCKERHUB_CREDENTIALS_USR}/${APP_NAME}:${IMAGE_TAG} ."
                }
            }
        }
        stage('Login') {
            steps {
                echo 'Login in ...'
                sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
            }
        }
        stage('Push') {
            steps {
                echo 'Pushing ...'
                sh "docker push ${DOCKERHUB_CREDENTIALS_USR}/${APP_NAME}:${IMAGE_TAG}"
            }
        }
    }
    post {
        always {
            sh 'docker logout'
        }
    }
}