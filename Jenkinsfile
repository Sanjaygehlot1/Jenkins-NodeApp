def IMAGE = "demo-app"
def TAG = "1.0"

pipeline {
    agent any
    tools {
        nodejs 'node22'
    }


    stages {

        stage("Build and Test"){
            parallel{
                stage("Frontend"){
                steps{
                dir('frontend'){
                    echo "Building and testing frontend..."
                    sh 'npm ci'
                    sh 'npm run build'
                    sh 'npm run test'
                }
            }
                }

                stage("Backend"){
steps{
                dir('backend'){
                    echo 'Building and testing backend...'
                    sh 'npm ci'
                    sh 'npm run test'
                }
            }
                }
            }
          
        }
            
        

        stage("Build and push Docker Image"){
             agent {
        docker {
            image 'docker:26'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
            
            steps{
                echo "Building Docker Image..."
                withCredentials([
                    usernamePassword(credentialsId: 'docker-cred', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD') 
                ]){

                sh "echo ${PASSWORD} | docker login -u ${USERNAME} --password-stdin"
                sh "docker build -t ${USERNAME}/${IMAGE}:${TAG} ."
                echo 'pushing docker image...'
                sh "docker push ${USERNAME}/${IMAGE}:${TAG}"
                }
                
            }
        }

        stage("Deploy"){
            steps{
                echo 'deploying to server...'
            }
        }
        
    }
}