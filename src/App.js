import React from "react";
import { Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";

function App() {

  const [updatingCookie, setUpdatingCookie] = React.useState(false);

  const handleUpdateCookie = () => {
    setUpdatingCookie(true);

    window.chrome.cookies.get({
      "url": 'https://pubapps.utcourts.gov/XchangeWEB/SearchServlet',
      "name": "JSESSIONID"
    }, function (cookie) {
      if (cookie && cookie.value) {
        fetch('https://api.utahcriminaldefense.attorney/search/cookie', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cookie: cookie.value
          })
        }).then(response => {
          setUpdatingCookie(false);
        }).catch(error => {
          alert('Failed!');
        });
      } else {
        alert('Failed!');
      }
    });
  };

  const handleOpenTab = (url) => {
    window.chrome.runtime.sendMessage(
      null,
      {
        author: 'stonelawfirm',
        url
      }
    );
  }

  return (
    <Box sx={{ width: 600, height: 600, padding: 4, backgroundColor: '#f2f2f2' }}>
      <Box sx={{ display: 'flex', '& > *+*': { marginLeft: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            component="img"
            src="/xchange.png"
            alt="xchange"
            sx={{ width: 30 }}
          />
          <Box
            component="a"
            href="https://pubapps.utcourts.gov/XchangeWEB/login"
            sx={{ marginLeft: 1 }}
            onClick={() => handleOpenTab('https://pubapps.utcourts.gov/XchangeWEB/login')}
          >
            Xchange
          </Box>
        </Box>
        <LoadingButton
          variant="outlined"
          size="small"
          sx={{ marginLeft: 3 }}
          onClick={handleUpdateCookie}
          loading={updatingCookie}
        >
          Update Key
        </LoadingButton>
      </Box>
      <Box sx={{ display: 'flex', marginTop: 2, '& > *+*': { marginLeft: 3 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', }}>
          <Box
            component="img"
            src="/logo.png"
            alt="xchange"
            sx={{ width: 30 }}
          />
          <Box
            component="a"
            href="https://app.utahcriminaldefense.attorney"
            sx={{ marginLeft: 1 }}
            onClick={() => handleOpenTab('https://app.utahcriminaldefense.attorney')}
          >
            Dashboard
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', }}>
          <Box
            component="img"
            src="/logo.png"
            alt="xchange"
            sx={{ width: 30 }}
          />
          <Box
            component="a"
            href="https://www.utahcriminaldefense.attorney"
            sx={{ marginLeft: 1 }}
            onClick={() => handleOpenTab('https://www.utahcriminaldefense.attorney')}
          >
            Site
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default App;
