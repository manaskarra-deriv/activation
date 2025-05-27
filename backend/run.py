import uvicorn

if __name__ == "__main__":
    print("Starting Partner Activation Academy API on http://localhost:8000")
    uvicorn.run("app.main:app", host="127.0.0.1", port=8000, reload=True, log_level="info") 