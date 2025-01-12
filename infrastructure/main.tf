provider "aws" {
  region = var.aws_region
}

module "vpc" {
  source = "./modules/vpc"
  # VPC configuration
}

module "ecs" {
  source = "./modules/ecs"
  # ECS configuration
}

module "alb" {
  source = "./modules/alb"
  # Application Load Balancer configuration
}

module "ecr" {
  source = "./modules/ecr"
  # ECR repositories configuration
} 