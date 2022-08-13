#!/usr/bin/env groovy

pipeline {

    agent {
        docker {
            image 'node:16.6-alpine'
            args '-u dmuthami'
        }
    }

    stages {
        stage('Build') {
            steps {
                echo 'Building...'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing...'
                sh 'npm test'
            }
        }
    }
}
