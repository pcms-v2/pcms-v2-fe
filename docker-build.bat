@echo off

set DOCKER_IMAGE_NAME=sms-fe-image
set CONTAINER_NAME=sms-fe-container

call :cleanup_container %CONTAINER_NAME%
docker rmi %DOCKER_IMAGE_NAME%

docker build --force-rm ^
  --platform=linux/amd64 ^
  -t %DOCKER_IMAGE_NAME% .

docker run -d ^
  -p 3000:3000 ^
  --name %CONTAINER_NAME% ^
  %DOCKER_IMAGE_NAME%

docker builder prune -f

echo Successfully started sms-frontend !!
exit /b
pause

:cleanup_container
set container_name=%1
for /f "delims=" %%i in ('docker ps -a --filter "name=%container_name%" --format "{{.ID}}"') do (
    set running_container=%%i
)

if defined running_container (
    echo Stopping and removing existing container %container_name%...
    docker stop %running_container% > nul
    docker rm %running_container% > nul
    echo Removed existing container %container_name%.
)
