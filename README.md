<!-- Improved compatibility of back to top link: See: https://github.com/floridomeacci/RoderickGPT -->
<a name="readme-top"></a>
<!--
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/floridomeacci/tbwa-backslash-generator">
    <img src="images/title.gif" alt="TBWA Backslash Generator" width="200" height="100%">
  </a>

  <h3 align="center">TBWA Backslash Generator</h3>

  <p align="center">
    For TBWA, I utilized Replicate.com's API capabilities to create an AI backslash image generator. The backslash, being TBWA's company logo, is now embedded in every image.
    <br />
    <br>
    <a href="https://gen.tbwa.nl">View Demo</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project

Every TBWA agency around the world has always produced their own creative backslashes. Whether to commemorate a holiday, event, or client partnership, the backslashes are used in pitches, creative decks, or just for fun. Now, with the advent of generative AI, I set out to create a backslash AI generator for the company in my spare time. The backslash generator leverages Replicate.com's lucataco/illusion-diffusion-hq model, otherwise known as the QR-monster model. However, instead of QR codes, I used our company's logo (the backslash) as its guiding template. I also implemented a NSFW filter through Replicate.com (m1guelpf/nsfw-filter) which scans the generated images for NSFW content.

The website is currently available on staging, at <a href="https://gentbwanl.wpenginepowered.com/"><b>gen.tbwa.nl</b></a>, but will eventually be accessible only to TBWA employees.

Key features include:
* A customizable options menu for different sizes and alignments.
* An NSFW content check.
* A dynamic 3D loading animation.

Upcoming features:
* Persistent states for the options menu. (Currently in progress)
* Queuing system for AI generation requests.
* Implementation of rate limiting to ensure optimal performance.

<br>

Start screen:

![Product Name Screen Shot 1](images/Screenshot%202024-03-31%20at%2010.53.23.png)

Options menu:

![Product Name Screen Shot 2](images/Screenshot%202024-03-31%20at%2010.53.02.png)

Load screen, followed by a percentage loader:

![Product Name Screen Shot 3](images/Screenshot%202024-03-31%20at%2010.53.38.png)

End result:

![Product Name Screen Shot 4](images/Screenshot%202024-03-31%20at%2010.54.03.png)

The uploaded code to github is 90% completed. TBWA has strict security protocals, this meant rewriting the code to work with their wordpress environment. I'm still working on some final issues. 

<!-- BUILT WITH -->
## Built With

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

<!-- CONTACT -->
## Contact

Florido Meacci - meacciflorido@gmail.com

Project Link: [https://github.com/floridomeacci/TBWA-backslash-generator](https://github.com/floridomeacci/TBWA-backslash-generator)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
