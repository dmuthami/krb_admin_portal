#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node:16.6-alpine'
            args '-u root'
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'docker build -t dmuthami/docker-react -f Dockerfile.dev .'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'docker run dmuthami/docker-react npm run test -- --coverage'
            }
        }
    }
}
