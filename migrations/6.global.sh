#!/bin/bash

bash ./migrations/1.init_db.sh
echo "1.init_db.sh"

bash ./migrations/2.add_version.sh
echo "2.add_version.sh"

bash ./migrations/3.deploy.sh
echo "3.deploy.sh"

bash ./migrations/5.seeding.sh
echo "5.seeding.sh"