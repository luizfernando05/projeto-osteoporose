# ML Models

Conteúdo

Pasta com datasets, notebooks e experimentos usados para treinar modelos de predição de osteoporose.

Estrutura relevante

- `datasets/` — CSVs usados nos notebooks
- `notebooks/` — Jupyter notebooks por conjunto de dados

Como começar

```
cd ml-models
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt  # se existir
jupyter lab
```

Dicas

- Abra os notebooks em `notebooks/` para ver pré-processamento e treinos.
- Scripts de treino podem gerar artefatos em `ml-models/images/`.
