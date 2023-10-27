// Importações de bibliotecas e componentes React
import { Container, Col, Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

// Importações de componentes personalizados
import { SideBar } from '../Sidebar/Sidebar';
import { Header } from "../Header";
import { Input } from '../Input';
import '../../Style/Home.css'; // Importe um arquivo CSS para estilização

// Importação da função de serviço para criar turmas
import { createTurmas } from "../../services/turmas-service";

// Definição do componente 'FormularioTurma'
export function FormularioTurma() {
    // Inicialização dos estados e hooks
    const { handleSubmit, register, formState: { errors }, reset } = useForm();
    const [alertMessage, setAlertMessage] = useState(null);
    const navigate = useNavigate();

    // Função para exibir alertas
    const showAlert = (message, severity) => {
        setAlertMessage({ message, severity });
    };

    // Função para adicionar uma turma
    async function addTurmas(data) {
        try {
            await createTurmas(data);
            reset(); // Limpa o formulário após a submissão
            showAlert('Turma Cadastrada com sucesso', 'success'); // Exibe o alerta de sucesso
            setTimeout(() => {
                setAlertMessage(null);
            }, 5000);
        } catch (error) {
            console.error(error);
            showAlert('Ocorreu um erro ao cadastrar a turma', 'error'); // Exibe o alerta de erro
        }
    }

    // Renderização do componente
    return (
        <div className='container-margin'>
            <SideBar /> {/* Renderização da barra lateral */}
            {alertMessage && (
                <Stack sx={{ width: '100%' }} spacing={2}>
                    <Alert severity={alertMessage.severity}>{alertMessage.message}</Alert>
                </Stack>
            )}
            <Container fluid>
                <Header title="Formulário de Turmas" />

                <Col className="w-50 m-auto mt-4"> {/* Adicionei a margem superior aqui */}
                    {/* Formulário de cadastro de turma */}
                    <Form noValidate onSubmit={handleSubmit(addTurmas)} validated={!!errors}>
                        <Input
                            className="mb-3"
                            type='text'
                            label='Nome da Turma'
                            placeholder='Insira o nome da turma'
                            required={true}
                            name='nometurmas'
                            error={errors.nometurmas}
                            validations={register('nometurmas', {
                                required: {
                                    value: true,
                                    message: 'Nome da turma é obrigatório.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='text'
                            label='Tipo de Ensino'
                            placeholder='Insira o ensino'
                            required={true}
                            name='ensino'
                            error={errors.ensino}
                            validations={register('ensino', {
                                required: {
                                    value: true,
                                    message: 'O tipo de ensino é obrigatório.'
                                }
                            })}
                        />

                        <Input
                            className="mb-3"
                            type='text'
                            label='Carga Horária'
                            placeholder='Insira a carga Horária'
                            required={true}
                            name='cargaHoraria'
                            error={errors.cargaHoraria}
                            validations={register('cargaHoraria', {
                                required: {
                                    value: true,
                                    message: 'Carga Horária é obrigatória.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='date'
                            label='Data Início'
                            required={true}
                            name='data_inicio'
                            error={errors.data_inicio}
                            validations={register('data_inicio', {
                                required: {
                                    value: true,
                                    message: 'Data de início é obrigatória.'
                                }
                            })}
                        />
                        <Input
                            className="mb-3"
                            type='date'
                            label='Data Final'
                            required={true}
                            name='data_final'
                            error={errors.data_final}
                            validations={register('data_final', {
                                required: {
                                    value: true,
                                    message: 'Data de finalização é obrigatória.'
                                }
                            })}
                        />

                        <Form.Group>
                            <Form.Label>Selecione o Turno</Form.Label>
                            <Form.Select {...register('turno')}>
                                <option disabled>Clique para selecionar</option>
                                <option value={'Matutino'}>Matutino</option>
                                <option value={'Vespertino'}>Vespertino</option>
                                <option value={'Noturno'}>Noturno</option>
                            </Form.Select>
                        </Form.Group>
                        <Grid container justifyContent="flex-end">
                            <Button className="mt-3 mb-3" variant='contained' color='success' type="submit"> {/* Adicionei a margem superior aqui */}
                                Confirmar Cadastro
                            </Button>
                            <Grid item xs={0.30}></Grid>
                            <Button className="mt-3 mb-3" variant="contained" color='error' onClick={() => navigate('/turmas')}>
                                Cancelar
                            </Button>
                        </Grid>
                    </Form>
                </Col>
            </Container>
        </div>
    );
}
