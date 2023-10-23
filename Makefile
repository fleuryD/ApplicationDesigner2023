C_NOR =	\033[0m
C_BLA = \033[1;30m
C_RED = \033[1;31m
C_GRE = \033[1;32m
C_YEL = \033[1;33m
C_BLU = \033[1;34m
C_MAG = \033[1;35m
C_CYA = \033[1;36m
C_WHI = \033[1;37m



all : up



up :
	@ clear
	@ echo "\n\n$(C_CYA)===== MAKE : =====$(C_NOR)\n"

	@ echo "\n$(C_YEL)docker compose -f ./docker-compose.yml up --build :$(C_NOR)"
	@ docker compose -f ./docker-compose.yml up --build


re :
	@ clear
	@ echo "\n\n$(C_CYA)===== MAKE RE: =====$(C_NOR)\n"

	@ echo "\n$(C_YEL)docker compose -f ./docker-compose.yml down :$(C_NOR)"
	@ docker compose -f ./docker-compose.yml down

	@ echo "\n$(C_YEL)docker compose -f ./docker-compose.yml up --build :$(C_NOR)"
	@ docker compose -f ./docker-compose.yml up --build



ps:
	@ clear
	@ echo "\n\n$(C_CYA)===== MAKE PS : =====$(C_NOR)\n"
	@ make x_ps




clean:
	clear
	@ echo "\n\n$(C_CYA)===== MAKE CLEAN : =====$(C_NOR)\n"

	@ echo "\n$(C_YEL)docker-compose -f docker-compose.yml down -v :$(C_NOR)"
	@ docker-compose -f docker-compose.yml down -v

	@ echo "\n$(C_YEL)docker volume prune -f :$(C_NOR)"
	@ docker volume prune -f

	@ echo "\n$(C_YEL)docker system prune -a -f :$(C_NOR)"
	@ docker system prune -a -f

	@ echo "\n\n"

	@ make x_ps




# PRIVATE ----------------------------------------------------------------------

x_clean:
	@ echo "\n$(C_YEL)docker-compose -f docker-compose.yml down -v :$(C_NOR)"
	@ docker-compose -f docker-compose.yml down -v

	@ echo "\n$(C_YEL)docker volume prune -f :$(C_NOR)"
	@ docker volume prune -f

	@ echo "\n$(C_YEL)docker system prune -a -f :$(C_NOR)"
	@ docker system prune -a -f

	@ echo ""


x_ps:
	@ echo "\n$(C_YEL)=== docker images ps : ===$(C_NOR)"
	@ docker images ps

	@ echo "\n$(C_YEL)=== docker container ps : ===$(C_NOR)"
	@ docker container ps

	@ echo "\n$(C_YEL)=== docker volume ls : ===$(C_NOR)"
	@ docker volume ls

	@ echo ""