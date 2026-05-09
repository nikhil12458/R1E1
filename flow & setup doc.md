# Building an AI-Powered Virtual Try-On System for My MERN Ecommerce Project (Vastraa)

## Introduction

I recently worked on one of the most challenging and exciting parts of my ecommerce project called **Vastraa** — integrating an open-source AI virtual try-on model into a MERN stack application.

The idea behind Vastraa is culturally inspired.

It is a traditional Indian women’s clothing platform focused on fabrics, custom-printed suits, village-inspired aesthetics, and modern AI experiences.

One feature I wanted to build was:

> Upload your own image + upload a fabric image → AI generates how the stitched dress would look on the user.

This sounds simple at first.

But implementing it from scratch involved:

- Open-source AI models
- Google Colab GPU setup
- FastAPI server creation
- ngrok tunneling
- Express backend integration
- React frontend integration
- Binary image handling
- Timeout debugging
- Model optimization
- Infrastructure limitations

This journey taught me more practical engineering than many tutorials.

---

# Tech Stack Used

## Frontend

- React
- Redux Toolkit
- Vite
- Axios

## Backend

- Node.js
- Express.js
- Multer
- FormData
- Axios

## Database

- MongoDB
- Mongoose

## AI Infrastructure

- Google Colab GPU
- FastAPI
- ngrok
- FASHN AI VTON 1.5
- Python
- PyTorch

---

# Phase 1 — Finding the Right AI Model

Initially I explored:

- Cloudinary
- ImageKit
- CLAID AI
- Fashion AI APIs

But I wanted:

- More control
- Lower cost
- Open-source flexibility
- Ability to customize later

Then I discovered:

## FASHN VTON 1.5

GitHub:
[https://github.com/fashn-AI/fashn-vton-1.5](https://github.com/fashn-AI/fashn-vton-1.5)

This model allows:

- person image upload
- garment image upload
- AI-based virtual try-on generation

Exactly what I needed.

---

# Phase 2 — Learning Google Colab

I had almost no experience with Google Colab initially.

I had to learn:

- notebook workflow
- GPU runtime setup
- package installation
- Python execution flow
- model loading
- inference execution

The first challenge was simply cloning and running the model.

---

# Phase 3 — Cloning and Installing the Model

I cloned the repository:

```bash
!git clone https://github.com/fashn-AI/fashn-vton-1.5.git
```

Then moved into the project:

```bash
%cd /content/fashn-vton-1.5
```

Installed dependencies:

```bash
!pip install -e .
```

Then downloaded model weights.

At this point I faced multiple issues:

- package imports failing
- editable installs not refreshing
- runtime resets
- missing module errors

One important realization:

Google Colab environments are temporary.

Restarting runtime often breaks installations.

---

# Phase 4 — Fixing Python Imports

One major issue was:

```python
ModuleNotFoundError: No module named 'fashn_vton'
```

The fix was manually adding the source path:

```python
import sys

sys.path.append('/content/fashn-vton-1.5/src')
```

After that:

```python
from fashn_vton.pipeline import TryOnPipeline
```

finally worked.

This taught me how Python package paths work internally.

---

# Phase 5 — Running the AI Model

Then I loaded the pipeline:

```python
pipeline = TryOnPipeline(
    weights_dir='./weights'
)
```

This step took time because:

- model weights are huge
- GPU memory initializes
- inference graph loads

Once the model loaded successfully, I tested inference manually.

I uploaded:

- person image
- garment image

Then generated:

```python
result = pipeline(
    person_image=person_image,
    garment_image=garment_image,
    category='one-pieces'
)
```

The first successful AI-generated output felt unreal.

---

# Phase 6 — Creating an AI API Server

I did not want the model to stay isolated in Colab.

I wanted:

```text
React Frontend
↓
Express Backend
↓
AI Model API
```

So I created a FastAPI server.

## FastAPI Route

```python
@app.post('/generate')
async def generate_tryon(...)
```

The route:

- accepts uploaded files
- saves them temporarily
- runs inference
- returns generated image

This transformed the AI model into a real API service.

---

# Phase 7 — Making Colab Public with ngrok

Google Colab runs locally inside cloud notebooks.

My backend could not access it directly.

So I used:

## ngrok

This creates a public URL pointing to the Colab server.

Example:

```text
https://xxxx.ngrok-free.app
```

This allowed my Express backend to communicate with the AI server.

---

# Phase 8 — Building the Express AI Layer

My backend architecture already followed clean folder structure.

I created:

```text
src/services/ai.service.js
src/controllers/ai.controller.js
src/routes/ai.routes.js
```

This layer:

- receives frontend images
- forwards them to Colab AI API
- receives generated image
- returns image to frontend

---

# Phase 9 — Using Multer + FormData

I used:

- multer memory storage
- FormData
- axios

The backend converted uploaded images into multipart/form-data requests.

Example:

```js
formData.append('person', personBuffer, 'person.jpg')
formData.append('garment', garmentBuffer, 'garment.jpg')
```

This allowed Node.js to communicate with the Python FastAPI server.

---

# Phase 10 — Building Frontend Integration

My frontend structure followed feature-based architecture.

I created:

```text
src/features/ai
```

Including:

- services
- hooks
- Redux slice
- page
- components

One important thing I wanted was:

The AI try-on feature should feel like a natural ecommerce experience instead of a separate AI demo page.

So I integrated the virtual try-on flow directly into the product page.

---

# Product Page → AI Try-On Flow

The flow works like this:

```text
User opens product page
        ↓
User selects a product variant
        ↓
Clicks "Virtual Try-On"
        ↓
Redirected to AI Try-On page
        ↓
Selected variant image auto-filled as garment image
        ↓
User uploads their own image
        ↓
AI generates final try-on preview
```

This made the experience feel:

- personalized
- realistic
- ecommerce-focused
- interactive

instead of just another standalone AI tool.

---

# Passing Variant Image from Product Page

When the user clicks:

```text
Virtual Try-On
```

I navigate to the AI page while passing the selected variant image.

Example:

```js
navigate('/ai-tryon', {
  state: {
    garmentImage: selectedVariant.images[0],
  },
})
```

This automatically sends the selected product variant image to the try-on page.

---

# Receiving Garment Image on AI Page

Inside the AI try-on page:

```js
import { useLocation } from 'react-router-dom'

const location = useLocation()

const garmentImage = location.state?.garmentImage
```

This allowed the selected product variant image to appear automatically on the AI page.

So the user only needs to upload:

- their own image

instead of uploading both images manually.

This improved:

- UX
- conversion flow
- user engagement
- simplicity

---

# Frontend AI Service

I created a dedicated service layer:

```text
src/features/ai/service/ai.service.js
```

Example:

```js
import axios from 'axios'

export async function generateTryOn(formData) {

  const response = await axios.post(
    'http://localhost:3000/api/ai/generate-preview',
    formData,
    {
      responseType: 'blob',
    }
  )

  return response.data
}
```

This service:

- sends images to backend
- receives generated image blob
- returns AI result to frontend

---

# Redux AI Slice

I used Redux Toolkit for scalable AI state management.

Structure:

```text
src/features/ai/state/ai.slice.js
```

Example:

```js
import {
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit'

import axios from 'axios'


export const generateTryOn = createAsyncThunk(
  'ai/generateTryOn',

  async (formData, thunkAPI) => {

    try {

      const response = await axios.post(
        'http://localhost:3000/api/ai/generate-preview',
        formData,
        {
          responseType: 'blob',
        }
      )

      return URL.createObjectURL(response.data)

    } catch (error) {

      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
        'Generation failed'
      )
    }
  }
)
```

This allowed:

- loading state handling
- generated image persistence
- scalable AI state architecture
- future generation history support

---

# Frontend AI Hook

I also created a custom AI hook:

```text
src/features/ai/hook/useAITryOn.js
```

Example:

```js
const formData = new FormData()

formData.append('person', personImage)

formData.append('garment', garmentImage)
```

This sends:

- user image
- selected variant image

for AI generation.

---

# AI Try-On Page

The page:

```text
src/features/ai/pages/AITryOnPage.jsx
```

handles:

- garment image preview
- user image upload
- AI generation
- generated image display
- loading state
- error handling

---

# Backend AI Architecture

My backend already followed clean architecture.

So instead of mixing AI logic everywhere, I created:

```text
src/services/ai.service.js
src/controllers/ai.controller.js
src/routes/ai.routes.js
```

This separation helped keep:

- business logic clean
- API scalable
- AI integration modular

---

# Express AI Route

Example:

```js
router.post(
  '/generate-preview',

  upload.fields([
    {
      name: 'person',
      maxCount: 1,
    },
    {
      name: 'garment',
      maxCount: 1,
    },
  ]),

  generateTryOnPreview
)
```

This route:

- accepts uploaded images
- forwards them to AI server
- receives generated image
- streams final image back to frontend

---

# Backend → AI Server Communication

Inside:

```text
src/services/ai.service.js
```

I used:

- axios
- FormData
- multer memory storage

Example:

```js
formData.append(
  'person',
  personBuffer,
  'person.jpg'
)

formData.append(
  'garment',
  garmentBuffer,
  'garment.jpg'
)
```

This allowed Node.js to communicate with the FastAPI server running in Google Colab.

---

# Final User Flow

```text
User opens product page
        ↓
Selects product variant
        ↓
Clicks Virtual Try-On
        ↓
Variant image auto-selected
        ↓
Uploads own image
        ↓
Frontend sends images to backend
        ↓
Backend forwards images to AI API
        ↓
AI model generates result
        ↓
Generated image returned to frontend
        ↓
User sees virtual try-on preview
```

This made the AI feature feel like a real ecommerce experience instead of just an isolated AI demo.

---

# Phase 11 — Major Debugging Challenges

This was the hardest phase.

I faced:

- 500 errors
- 503 errors
- ngrok tunnel failures
- browser warning interstitials
- binary response handling issues
- request timeout issues
- Colab session resets
- inference delays

One major error:

```text
ERR_NGROK_3004
```

This happened because:

- ngrok free tunnel intercepted requests
- backend requests could not bypass warning page

Fix:

```js
'ngrok-skip-browser-warning': 'true'
```

Another issue:

AI inference was taking too long.

The model used:

```python
num_timesteps=30
```

This caused:

- 5 minute requests
- tunnel timeout
- backend failures

---

# Phase 12 — Optimizing AI Performance

I optimized inference speed using:

```python
num_timesteps=10
```

and later:

```python
num_timesteps=15
```

This balanced:

- generation quality
- realistic output
- response speed

I also learned:

Higher quality AI generation requires:

- better GPU infrastructure
- persistent servers
- optimized inference pipelines

Not just more code.

---

# Phase 13 — Understanding Real Infrastructure Problems

This project taught me an important engineering lesson:

Eventually infrastructure becomes harder than coding.

The actual bottleneck became:

- Colab limitations
- temporary runtimes
- free ngrok tunnels
- timeout handling
- long inference durations

At this point I realized why production AI startups use:

- RunPod
- Modal
- dedicated GPU servers
- persistent inference APIs

---

# Final Architecture

```text
React Frontend
      ↓
Express Backend
      ↓
Google Colab FastAPI Server
      ↓
FASHN AI VTON Model
      ↓
Generated AI Image
```

---

# What I Learned

This project taught me:

## Frontend

- advanced React architecture
- feature-based scaling
- Redux integration
- binary image handling

## Backend

- API architecture
- service/controller separation
- multipart uploads
- binary response streaming
- backend-to-backend communication

## AI Engineering

- model inference flow
- GPU inference handling
- Python API serving
- FastAPI
- inference optimization
- AI infrastructure limitations

## DevOps / Infrastructure

- public tunneling
- request timeout debugging
- cloud GPU limitations
- API deployment concepts

---

# Biggest Realization

Building AI products is not just:

```text
Run model
```

It involves:

- architecture
- networking
- infrastructure
- optimization
- debugging
- API design
- performance balancing

This project completely changed how I think about software engineering.

---

# Next Plans

Next I want to:

- move inference to RunPod
- improve image quality
- add pose preservation
- add cultural dress templates
- build generation history
- optimize response times
- improve realism
- scale Vastraa into a full AI fashion experience

---

# Final Thoughts

This journey involved:

- countless debugging sessions
- runtime crashes
- infrastructure failures
- API issues
- performance bottlenecks

But every issue taught me something valuable.

The most satisfying moment was finally seeing:

```text
Generated 1 images
```

after hours of debugging.

That single line represented:

- AI working
- backend connected
- frontend integrated
- architecture functioning end-to-end

And honestly, that felt amazing.

