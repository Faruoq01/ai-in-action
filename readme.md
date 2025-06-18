# 🧠 HealthMentor - Intelligent Medical Record Advisor

HealthMentor is an AI-powered healthcare advisor that takes user queries, searches a vectorized database of medical records, and returns a structured, clinical-grade summary. It empowers patients and practitioners with intelligent insights extracted from real-world health records.

---

## 🚀 Project Overview

In many parts of Africa, especially Nigeria, patients face limited access to specialized medical consultations and experience diagnostic uncertainty. HealthMentor aims to bridge that gap using AI by providing evidence-based suggestions, analysis, and next steps based on similar medical cases.

---

## ✨ Features

- ✍️ Accepts user natural language health queries
- 🧬 Performs semantic search using vector embeddings of medical records
- 📄 Returns expert-style clinical summaries with **Concern**, **Analysis**, **Suggested Action**, and **Tags**
- 🌐 Deployed frontend and backend on Google Cloud VM via Docker
- 🔐 Secure authentication using Google OAuth and JWT

---

## 🧱 Tech Stack

### Frontend
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Markdown Rendering**: `react-markdown`
- **State Management**: Redux Toolkit
- **Authentication**: Google OAuth2 + `js-cookie`
- **Components**: ShadCN UI, Custom Buttons, Skeleton Loader, ScrollArea
- **Markdown to UI Parser**: Custom `parseMedicalSummary` function

### Backend
- **Framework**: FastAPI (Python 3.11)
- **AI Integration**: Google Cloud Vertex AI (Text Embedding API)
- **Embedding Model**: `text-embedding-004`
- **Medical AI Reasoning**: Gemini 2.0 Flash (Google)
- **Database**: MongoDB Atlas
- **Authentication**: OAuth Token validation via FastAPI headers

---

## 🧠 AI & NLP Integration

- **Data Source**: Real-world medical records obtained from Hugging Face
- **Embedding Generation**: Records are processed and sent to Vertex AI to generate high-dimensional vectors
- **Vector Search**: Embeddings are stored and queried using a similarity search to find related cases
- **Inference**: Matched records are formatted and passed into Gemini 2.0 Flash with a structured prompt for clinical-style summarization

---

## ⚙️ Deployment Details

- 🔧 **Containerization**: Both frontend and backend are Dockerized
- ☁️ **Cloud**: Google Cloud Compute Engine VM
- 🔐 **Authentication**: JWT-based token set via cookies
- 🌍 **Domain**: Configured via GCP DNS
- 🔁 **CI/CD**: Github actions

---

## 🔐 Authentication Flow

1. User logs in with Google.
2. Backend validates and issues a JWT token stored in the db with is id passed to http only cookies.
3. Axios client includes `With credentials to pass the auth key` on each request.
4. FastAPI verifies the token from headers and grants access to secure routes.

---

## 🧪 Sample Query Input

> "Complains of lower back pain radiating to the left leg, especially after standing long periods."

## 📋 Output Format

```markdown
## Medical Records Analysis

### Concern
[Summary of patient's concern]

### Analysis
[Medical expert reasoning and potential diagnosis]

### Suggested Action
- Recommendation 1
- Recommendation 2
- ...

### Tags
neurology, musculoskeletal, patient_advocacy, ...


