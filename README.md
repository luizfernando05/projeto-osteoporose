# 👩‍⚕️ Pesquisa Osteoporosis

[](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)

Este repositório contém os códigos, notebooks e datasets usados no projeto de pesquisa para análise e predição de risco de osteoporose. Inclui uma API para expor modelos treinados, um frontend para interação (React/Expo) e os experimentos de Machine Learning.

## 🎯 Objetivo do Projeto

A proposta é investigar técnicas de Machine Learning para avaliar o risco de osteoporose e disponibilizar o melhor modelo via API para integração com aplicações móveis e web.

## 🗂️ Estrutura do Repositório

```
root/
├─ api/
│  ├─ main.py
│  └─ app/
│     └─ main.py
├─ app/                  # frontend (React / Expo)
│  ├─ package.json
│  └─ src/
├─ ml-models/
│  ├─ datasets/
│  └─ notebooks/
├─ README.md
```

## 🚀 Tecnologias Utilizadas

- Python, Jupyter, pandas, scikit-learn
- Flask ou FastAPI (dependendo da implementação em `api/`)
- React / Expo para o frontend

## 🛠️ Como utilizar

1. Clone o repositório:

```bash
git clone https://github.com/luizfernando05/projeto-osteoporose
cd root
```

2. Rodar a API (ex.: PowerShell):

```powershell
cd api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt   # se existir
python -m api.main                # ou python app/main.py
```

3. Rodar o frontend:

```bash
cd app
npm install
npm run start    # ou expo start
```

4. Abrir notebooks (ml-models):

```powershell
cd ml-models
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
jupyter lab
```

5. Exemplo rápido de requisição à API (ajuste conforme implementação):

```bash
curl -X POST http://localhost:5000/predict \
	-H "Content-Type: application/json" \
	-d '{"example_feature": 1.0, "another_feature": 2.0}'
```

## 👥 Equipe do Projeto

- Luiz Fernando da Cunha Silva
- Luiz Felipe da Cunha Silva
- Samara Martins Nascimento Gonçales
- Adriana Mara Guimarães de Farias
