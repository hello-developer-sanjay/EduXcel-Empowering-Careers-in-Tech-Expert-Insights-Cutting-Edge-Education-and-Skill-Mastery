import { useState,useEffect  } from 'react';
import '../styles/LicHeader.css';
import styled from 'styled-components';

const ProjectDetailsContainer = styled.div`
  padding: 1rem;
  background-color: #050816;
  overflow: hidden;
  align-items: center;
`;

const ProjectsContent = styled.div`
  background-color: #050816;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 300px; /* Set a fixed height */
  margin-top: 0rem;
`;

const CardContainer = styled.div`
  background-color: #090e0a;
  color: white;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

const CardContent = styled.p`
  font-size: 1rem;
`;

const ProjectDetailsTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ff6b6b;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
  font-family: 'Pacifico', cursive;
  background-image: linear-gradient(45deg, #ff6b6b, #ffc6c6);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: rainbow 3s linear infinite;

  @keyframes rainbow {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`;

function SubHeader() {
  const [content, setContent] = useState('');
  const [selectedOption, setSelectedOption] = useState('मेरे परिवार की रक्षा करें');

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case 'मेरे परिवार की रक्षा करें':
        setContent(
          <>
            <CardContainer>
              <CardTitle>एलआईसी का नया टेक टर्म</CardTitle>
              <CardContent>
                लेवल सम एश्योर्ड और बढ़ती हुई सम एश्योर्ड के बीच चयन करें। <br/>
                लचीले प्रीमियम विकल्प (एकल, नियमित, सीमित), पॉलिसी अवधि और किश्तों में लाभ प्राप्त करने का विकल्प।
              </CardContent>
            </CardContainer>
            <CardContainer>
              <CardTitle>एलआईसी का जीवन उत्सव</CardTitle>
              <CardContent>
                प्रीमियम भुगतान अवधि के 3-6 साल बाद बीमा राशि के 10% का गारंटीशुदा वार्षिक भुगतान शुरू होता है, जिससे
                आजीवन वित्तीय सुरक्षा सुनिश्चित होती है। <br/>प्रीमियम भुगतान अवधि के दौरान गारंटीकृत अतिरिक्त, 5-16 वर्षों
                की सीमित प्रीमियम भुगतान अवधि वाले संपूर्ण जीवन बीमा के साथ, स्थायी लाभ प्रदान करते हैं।
              </CardContent>
            </CardContainer>
            <CardContainer>
              <CardTitle>एलआईसी का अमृतबल</CardTitle>
              <CardContent>
                निरंतर वृद्धि के लिए पॉलिसी अवधि के दौरान आकर्षक गारंटीशुदा अतिरिक्त सुविधाएं प्रदान की जाती हैं। <br/>एकल या सीमित
                प्रीमियम भुगतान चुनने की लचीलेपन के साथ 18-25 वर्ष के बीच परिपक्वता आयु विकल्प।
              </CardContent>
            </CardContainer>
            <CardContainer>
              <CardTitle>एलआईसी का जीवन किरण</CardTitle>
              <CardContent>
                नॉन-लिंक्ड, नॉन-पार्टिसिपेटिंग, व्यक्तिगत, बचत, जीवन बीमा योजना। <br/>सुरक्षा सह बचत के माध्यम से परिवार को वित्तीय
                सहायता प्रदान करता है।
              </CardContent>
            </CardContainer>
          </>
        );
        break;
        case 'स्वास्थ्य देखभाल':
            setContent(
              <>
                <CardContainer>
                  <CardTitle>एलआईसी का कैंसर कवर</CardTitle>
                  <CardContent>
                  कैंसर कवर एक नियमित प्रीमियम, नॉन-लिंक्ड, नॉन-पार्टिसिपेटिंग स्वास्थ्य बीमा योजना है। <br/>यदि पॉलिसी अवधि के दौरान बीमित व्यक्ति को निर्दिष्ट प्रारंभिक या प्रमुख चरण के कैंसर का पता चलता है तो यह वित्तीय सुरक्षा प्रदान करता है।                  </CardContent>
                  <CardTitle>एलआईसी का आरोग्य रक्षक</CardTitle>
                  <CardContent>
                  एलआईसी की आरोग्य रक्षक एक नियमित प्रीमियम, नॉन-लिंक्ड, नॉन-पार्टिसिपेटिंग स्वास्थ्य बीमा योजना है। <br/>यह विशिष्ट स्वास्थ्य जोखिमों के लिए निश्चित लाभ स्वास्थ्य बीमा कवर प्रदान करता है, जिससे चिकित्सा आपात स्थिति के दौरान सहायता सुनिश्चित होती है।
                   </CardContent>
              
              
                </CardContainer>
                {/* Add more cards if needed */}
              </>
            );
            break;
          case 'धन बनाना':
            setContent(
              <>
                <CardContainer>
                  <CardTitle>एलआईसी का सरल जीवन बीमा</CardTitle>
                  <CardContent>
                  जोखिम शुरू होने की तारीख से शुरुआती 45 दिनों की प्रतीक्षा अवधि के भीतर ही आकस्मिक मृत्यु को कवर किया जाता है।<br/>
                  प्रतीक्षा अवधि में गैर-आकस्मिक मृत्यु के लिए, 100% प्रीमियम (करों को छोड़कर) का भुगतान किया जाता है।                  </CardContent>
                  <CardTitle>एलआईसी का इंडेक्स प्लस</CardTitle>
                  <CardContent>
                  मासिक प्रीमियम रु2500/- से शुरू होता है, जो पॉलिसीधारकों के लिए सामर्थ्य प्रदान करता है।<br/>
                  दो फंडों का विकल्प, जिसमें चयनित निफ्टी 50 शेयरों में 100% तक, पॉलिसी मूल्य वृद्धि के लिए गारंटीकृत अतिरिक्त शामिल हैं।
                  </CardContent>
  
                  <CardTitle>एलआईसी का एसआईआईपी</CardTitle>
                  <CardContent>
                  यूनिट-लिंक्ड फंड के माध्यम से जीवन बीमा कवरेज को निवेश के अवसरों के साथ जोड़ता है। <br/>
पॉलिसीधारकों को NACH के माध्यम से केवल ₹4,000 मासिक से शुरू होने वाले प्रीमियम चुनने की अनुमति देता है, जिससे व्यक्तिगत वित्तीय योजना बनाने में सुविधा होती है। </CardContent>
               

<CardTitle>एलआईसी का जीवन आज़ाद</CardTitle>
                  <CardContent>
                  बचत पर केंद्रित व्यक्तियों के लिए तैयार की गई जीवन बीमा योजना की विशेषता। <br/>
18 वर्ष की न्यूनतम प्रवेश आयु आवश्यकता के साथ गारंटीशुदा आय लाभ प्रदान करता है, जिससे व्यक्तियों की एक विस्तृत श्रृंखला के लिए पहुंच सुनिश्चित होती है।</CardContent>
               
               
               
                </CardContainer>
                {/* Add more cards if needed */}
              </>
            );
            break;
          case 'बच्चों के भविष्य की योजना बनाएं':
            setContent(
              <>
                <CardContainer>
                  <CardTitle>एलआईसी का अमृतबल</CardTitle>
                  <CardContent>
                  निरंतर वृद्धि के लिए पॉलिसी अवधि के दौरान आकर्षक गारंटीशुदा अतिरिक्त सुविधाएं प्रदान की जाती हैं। <br/>
एकल या सीमित प्रीमियम भुगतान चुनने की लचीलेपन के साथ 18-25 वर्ष के बीच परिपक्वता आयु विकल्प।                  </CardContent>
<CardTitle>एलआईसी का यू चिल्ड्रेन मनी बैक योजना</CardTitle>
                  <CardContent>
                  यह योजना विशेष रूप से बढ़ते बच्चों की शिक्षा, विवाह और अन्य जरूरतों को पूरा करने के लिए बनाई गई है।<br/>
यह योजना 0 से 12 वर्ष की आयु के बच्चे के लिए माता-पिता या दादा-दादी में से कोई भी खरीद सकता है।
</CardContent>
<CardTitle>एलआईसी का जीवन तरूण</CardTitle>  
                  <CardContent>
                  यह योजना बढ़ते बच्चों को 20 से 24 वर्ष की आयु तक वार्षिक जीवन रक्षा लाभ के साथ-साथ 25 वर्ष की आयु में परिपक्वता लाभ का समर्थन करती है। <br/>
यह एक लचीली योजना है जिसमें प्रस्ताव के चरण में प्रस्तावक जीवन रक्षा लाभ का अनुपात चुन सकता है।</CardContent>
                

                
                
                </CardContainer>
                {/* Add more cards if needed */}
              </>
            );
            break;
          case 'सेवानिवृत्ति के लिए योजना':
            setContent(
              <>
                <CardContainer>
                  <CardTitle>एलआईसी का नई जीवन शांति</CardTitle>
                  <CardContent>
                  यह एकल प्रीमियम योजना एकल जीवन और संयुक्त जीवन आस्थगित वार्षिकी के बीच एक विकल्प प्रदान करती है। <b/>
पॉलिसी से गारंटीशुदा दरें, वार्षिकीधारक के जीवनकाल के दौरान स्थगन अवधि के बाद भुगतान के साथ शुरू होती हैं।
                  </CardContent>
                  <CardTitle>एलआईसी का जीवन अक्षय - VII</CardTitle>
                  <CardContent>
                  यह तत्काल वार्षिकी योजना पॉलिसीधारक को एकमुश्त राशि का भुगतान करके 10 वार्षिकी विकल्पों में से चुनने की अनुमति देती है। <br/>
                  वार्षिकी दरों की शुरुआत से ही गारंटी दी जाती है, और भुगतान वार्षिकीधारक के पूरे जीवनकाल तक जारी रहता है।   </CardContent>


                  <CardTitle>एलआईसी का सरल पेंशन</CardTitle>
                  <CardContent>
                  यह मानक तत्काल वार्षिकी योजना आईआरडीएआई दिशानिर्देशों का पालन करती है, जो सभी बीमाकर्ताओं के लिए लगातार नियम और शर्तें सुनिश्चित करती है। <br/>
पॉलिसी की शुरुआत में निर्धारित गारंटीशुदा दरें, वार्षिकीधारक के जीवनकाल तक जारी रहती हैं।      </CardContent>


                  <CardTitle>एलआईसी का जीवन धारा II</CardTitle>
                  <CardContent>
                  शुरुआत से ही गारंटीशुदा वार्षिकी तत्काल वित्तीय स्थिरता का आश्वासन देती है। <br/>
अधिक उम्र में उच्च वार्षिकी दरें और मौजूदा एलआईसी पॉलिसीधारकों के लिए बेहतर लाभ दीर्घकालिक वित्तीय सुरक्षा और वफादारी को बढ़ावा देते हैं।

        </CardContent>
               
               
               
               
                </CardContainer>
                {/* Add more cards if needed */}
              </>
            );
            break;
          default:
            setContent('');
            break;
        }
  };

  useEffect(() => {
    // Call handleDropdownChange with default value when component mounts
    handleDropdownChange({ target: { value: selectedOption } });
  }, []);

  return (
    <ProjectDetailsContainer>
      <ProjectDetailsTitle>
        <div className="dropdown-sticky-container">
          <div className="dropdown-containerlic">
            <label htmlFor="coursesDropdownlic" className="dropdown-label">
              Select a Plan:
            </label>
            <select
              id="coursesDropdown"
              onChange={handleDropdownChange}
              value={selectedOption}
              className="courses-dropdownlic"
            >
              <option value="">Choose a Plan</option>
              <option value="मेरे परिवार की रक्षा करें">मेरे परिवार की रक्षा करें </option>
              <option value="स्वास्थ्य देखभाल">स्वास्थ्य देखभाल</option>
              <option value="धन बनाना">धन बनाना</option>
              <option value="बच्चों के भविष्य की योजना बनाएं">बच्चों के भविष्य की योजना बनाएं</option>
              <option value="सेवानिवृत्ति के लिए योजना">सेवानिवृत्ति के लिए योजना</option>
            </select>
          </div>
        </div>
      </ProjectDetailsTitle>

      <ProjectsContent>
        {content}
      </ProjectsContent>
    </ProjectDetailsContainer>
  );
}

export default SubHeader;
