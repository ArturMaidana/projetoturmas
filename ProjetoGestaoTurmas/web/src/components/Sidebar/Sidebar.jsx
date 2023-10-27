import React, { useState } from 'react'; // Importa o React e a função useState do React
import { styled, useTheme } from '@mui/material/styles'; // Importa estilos e useTheme do Material-UI
import Box from '@mui/material/Box'; // Importa o componente Box do Material-UI
import MuiDrawer from '@mui/material/Drawer'; // Importa o componente Drawer do Material-UI
import MuiAppBar from '@mui/material/AppBar'; // Importa o componente AppBar do Material-UI
import Toolbar from '@mui/material/Toolbar'; // Importa o componente Toolbar do Material-UI
import List from '@mui/material/List'; // Importa o componente List do Material-UI
import CssBaseline from '@mui/material/CssBaseline'; // Importa o componente CssBaseline do Material-UI
import Typography from '@mui/material/Typography'; // Importa o componente Typography do Material-UI
import Divider from '@mui/material/Divider'; // Importa o componente Divider do Material-UI
import IconButton from '@mui/material/IconButton'; // Importa o componente IconButton do Material-UI
import MenuIcon from '@mui/icons-material/Menu'; // Importa o ícone Menu do Material-UI
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'; // Importa o ícone ChevronLeft do Material-UI
import ChevronRightIcon from '@mui/icons-material/ChevronRight'; // Importa o ícone ChevronRight do Material-UI
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Importa o ícone ExitToApp do Material-UI
import ListItem from '@mui/material/ListItem'; // Importa o componente ListItem do Material-UI
import ListItemButton from '@mui/material/ListItemButton'; // Importa o componente ListItemButton do Material-UI
import ListItemIcon from '@mui/material/ListItemIcon'; // Importa o componente ListItemIcon do Material-UI
import ListItemText from '@mui/material/ListItemText'; // Importa o componente ListItemText do Material-UI
import TurmasIcon from '@mui/icons-material/Class'; // Importa o ícone Turmas do Material-UI
import AlunosIcon from '@mui/icons-material/People'; // Importa o ícone Alunos do Material-UI
import HomeIcon from '@mui/icons-material/Home'; // Importa o ícone Home do Material-UI
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PieChartIcon from '@mui/icons-material/PieChart'; // Importa o ícone PieChart do Material-UI
import { Link } from 'react-router-dom'; // Importa o componente Link do react-router-dom
import { Button, Modal } from 'react-bootstrap'; // Importa o componente Button e Modal do React-Bootstrap

// Define a largura da barra lateral quando está aberta
const drawerWidth = 240;

// Mixin para estilo quando a barra lateral está aberta
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: '#110f3b', // Cor de fundo azul escuro
  color: 'white', // Cor das letras branca
});

// Mixin para estilo quando a barra lateral está fechada
const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: '#110f3b', // Cor de fundo azul escuro
  color: 'white', // Cor das letras branca
});

// Componente para estilo da barra lateral
const whiteIconStyle = {
  color: 'white',
};

// Componente para o cabeçalho da barra lateral
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessário para que o conteúdo fique abaixo da barra de aplicativo
  ...theme.mixins.toolbar,
}));

// Componente para a barra de aplicativo (topo da página)
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: '#110f3b', // Cor de fundo azul escuro
  color: 'white', // Cor das letras branca
}));

// Componente para a barra lateral
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// Componente principal da barra lateral
export function SideBar() {
  const theme = useTheme();
  const [open, setOpen] = useState(false); // Estado para controlar se a barra lateral está aberta
  const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false); // Estado para exibir o modal de confirmação

  // Função para abrir a barra lateral
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Função para fechar a barra lateral
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // Função chamada ao clicar no botão de logout
  const handleLogoutClick = () => {
    // Exibir o modal de confirmação
    setShowLogoutConfirmation(true);
  };

  // Função chamada ao confirmar o logout no modal
  const handleConfirmLogout = () => {
    // Implemente a lógica de logout aqui, como remover tokens ou fazer logout do usuário
    // Neste exemplo, apenas remove o token de sessão
    sessionStorage.removeItem('token');
    // Feche o modal de confirmação após o logout
    setShowLogoutConfirmation(false);
  };

  // Definição das rotas e suas informações
  const routes = [
    { text: 'Home', icon: <HomeIcon style={whiteIconStyle} />, path: '/home' },
    { text: 'Dashboard', icon: <PieChartIcon style={whiteIconStyle} />, path: '/dashboard' },
    { text: 'Turmas', icon: <TurmasIcon style={whiteIconStyle} />, path: '/turmas' },
    { text: 'Alunos', icon: <AlunosIcon style={whiteIconStyle} />, path: '/alunos' },
    { text: 'Disciplina', icon: <MenuBookIcon style={whiteIconStyle} />, path: '/disciplinas' }
      
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline /> {/* Define estilos básicos de reset CSS */}
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }), // Esconde o botão quando a barra lateral está aberta
            }}
          >
            <MenuIcon style={whiteIconStyle} /> {/* Ícone do menu */}
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Gestão de Turmas {/* Título da barra de aplicativo */}
          </Typography>
          <div style={{ flexGrow: 1 }} /> {/* Espaço flexível */}
          <IconButton color="inherit" onClick={handleLogoutClick}>
            <ExitToAppIcon /> {/* Ícone de logout */}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon style={whiteIconStyle} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Mapeia as rotas e cria links para cada uma delas */}
          {routes.map((route, index) => (
            <ListItem
              key={route.text}
              disablePadding
              sx={{ display: 'block' }}
              component={Link} // Componente de link do react-router-dom
              to={route.path} // URL da rota
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {React.cloneElement(route.icon, { color: 'white' })} {/* Define a cor do ícone como branca */}
                </ListItemIcon>
                <ListItemText primary={route.text} sx={{ opacity: open ? 1 : 0, color:'white'}} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        {/* ... */}
      </Drawer>

      {/* Modal de confirmação de logout */}
      <Modal show={showLogoutConfirmation} onHide={() => setShowLogoutConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja sair?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowLogoutConfirmation(false)}>
            Cancelar
          </Button>
          <Link to='/' style={{color: 'inherit', textDecoration:'none'}}>
            <Button variant="danger" onClick={handleConfirmLogout}>
              Sair
            </Button>
          </Link>
        </Modal.Footer>
      </Modal>
    </Box>
  );
}
