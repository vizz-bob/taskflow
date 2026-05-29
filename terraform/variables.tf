variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project_name" {
  type    = string
  default = "taskflow"
}

variable "environment" {
  type    = string
  default = "production"
}

variable "db_name" {
  type    = string
  default = "taskflow"
}

variable "db_username" {
  type    = string
  default = "postgres"
}

variable "db_password" {
  type      = string
  sensitive = true
}

variable "eks_node_instance_type" {
  type    = string
  default = "t3.small"
}

variable "eks_node_min_size" {
  type    = number
  default = 1
}

variable "eks_node_max_size" {
  type    = number
  default = 3
}
