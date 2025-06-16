# import time
# from fastapi import Request, Response, Depends

# async def add_process_time_dependency(request: Request, response: Response):
#     start_time = time.perf_counter()
#     yield  # Let the route run
#     process_time = time.perf_counter() - start_time
#     response.headers["X-Process-Time"] = str(process_time)
