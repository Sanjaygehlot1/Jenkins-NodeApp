pipeline {
    agent any

    tools {
        nodejs 'node22'
    }

    environment{
        IMAGE_NAME = "demo-app"
        IMAGE_TAG = "1.1"
    }

    stages {

        stage('Build and Test') {
            parallel {

                stage('Frontend') {
                    steps {
                        dir('frontend') {
                            sh 'npm ci'
                            sh 'npm run build'
                            sh 'npm run test'
                        }
                    }
                }

                stage('Backend') {
                    steps {
                        dir('backend') {
                            sh 'npm ci'
                            sh 'npm run test'
                        }
                    }
                }
            }
        }

        stage('Build and Push Docker Image') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'docker-cred',
                        usernameVariable: 'USERNAME',
                        passwordVariable: 'PASSWORD'
                    )
                ]){
                    sh '''
                        docker --version
                        echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin
                        docker build -t $USERNAME/$IMAGE_NAME:$IMAGE_TAG .
                        docker push $USERNAME/$IMAGE_NAME:$IMAGE_TAG
                    '''
                }
            }
        }
        stage('connect to AWS EC2 instance and deploy'){
          steps{
              withCredentials([
                usernamePassword(
                    credentialsId: 'docker-cred',
                    usernameVariable: 'USERNAME',
                    passwordVariable: 'PASSWORD'
                )
            ]){
                sshagent(credentials: ['ec2-ssh-key']){
                    sh '''
ssh -o StrictHostKeyChecking=no ec2-user@ec2-54-198-167-13.compute-1.amazonaws.com << EOF
echo "$PASSWORD" | docker login -u "$USERNAME" --password-stdin 
docker pull  $USERNAME/$IMAGE_NAME:$IMAGE_TAG
docker stop demo-app || true
docker rm demo-app || true
docker run -d -p 3001:3001 --name demo-app $USERNAME/$IMAGE_NAME:$IMAGE_TAG
EOF
'''
                }
            } 
          }
            
        }

       
    }
}
