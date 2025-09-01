run_dev:
	cd ./Backend && npm run dev &
	cd ./Frontend && npm run dev &
	wait