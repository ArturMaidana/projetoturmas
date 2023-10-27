// Importações de bibliotecas e componentes do Material-UI e React
import React, { useState } from "react";
import { Button, Container, TextField, Typography, Paper, Grid, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logo from '../Style/logo.jpeg'

// Importações de componentes personalizados
import { Modal } from "../components/Modal";
import { registerUser } from "../services/user-services";

// Definição do componente 'Register'
export function Register() {
  // Configuração do formulário usando 'react-hook-form'
  const { handleSubmit, register, formState: { errors } } = useForm();
  
  // Estado para armazenar o resultado do registro
  const [result, setResult] = useState(null);
  
  // Navegação
  const navigate = useNavigate();

  // Função para lidar com o envio do formulário de registro
  const onSubmit = async (data) => {
    try {
      // Chama a função 'registerUser' para registrar o usuário
      const user = await registerUser(data);
      
      // Define o resultado do registro e navega para a página inicial
      setResult(user);
      navigate('/home');
    } catch (error) {
      // Em caso de erro, define o resultado com a mensagem de erro
      setResult({
        title: 'Houve um erro no cadastro!',
        message: error.response.data.error
      });
    }
  }

  // Renderização do componente
  return (
    <div className="teste">
      <div>
        <img
          src={logo}
          alt="Imagem de boas-vindas"
          style={{ maxWidth: '100%', marginTop: '1rem' }}
        />
      </div>
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            padding: '1rem', // Ajuste o preenchimento vertical e horizontal
            marginTop: '-14rem', // Ajuste a margem superior
            marginLeft: '1rem', // Mova o container mais para a direita
            marginRight: 'auto', 
          }}
        >
          {/* Modal para exibir mensagens */}
          <Modal
            show={result}
            title={result?.title}
            message={result?.message}
            handleClose={() => setResult(null)}
          />
          <Paper elevation={3} sx={{ width: '30rem', height: '30rem', backgroundColor: 'white', p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <Typography variant="h5" component="div" sx={{ fontSize: '30px' }}>Gestão de Turmas</Typography>
            <Typography variant="h6" sx={{ fontSize: '20px' }}>Registrar</Typography> 
            {/* Formulário de registro */}
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Nome"
                    variant="standard"
                    {...register('nome', {
                      required: 'Nome é obrigatório',
                    })}
                    error={!!errors.nome}
                    helperText={errors.nome?.message}
                    sx={{ height: '60px' }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Sobrenome"
                    variant="standard"
                    {...register('sobrenome', {
                      required: 'Sobrenome é obrigatório',
                    })}
                    error={!!errors.sobrenome}
                    helperText={errors.sobrenome?.message}
                    sx={{ height: '60px' }}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="E-mail"
                variant="standard"
                type="email"
                {...register('email', {
                  required: 'E-mail é obrigatório',
                  pattern: {
                    value: /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i,
                    message: 'E-mail inválido!',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
                sx={{ height: '60px', mb: 2 }}
              />
              <TextField
                fullWidth
                label="Senha"
                variant="standard"
                type="password"
                {...register('password', {
                  required: 'Senha é obrigatória',
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
                sx={{ height: '60px' }}
              />
              <Button type="submit" variant="contained" fullWidth sx={{ backgroundColor: 'dark', color: 'white', height: '50px', mt: 2 }}>Criar</Button>
              <Typography variant="body2" sx={{ fontSize: '14px', mt: 2 }}>
                Já tem uma conta? <Link to="/">Faça o login</Link> 
              </Typography>
            </form>
          </Paper>
        </Box>
      </Container>
    </div>
  );
}
