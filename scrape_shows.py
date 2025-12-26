from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select, WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
import time, pandas as pd, numpy as np

options = Options()
# options.add_argument('--headless=new')
driver = webdriver.Chrome(options)

driver.implicitly_wait(10)
driver.get('https://animemusic.org/')
pages = 22
entries = 100
df_list = []

for i in range(pages):
    rows_p_page = Select(driver.find_element(By.CLASS_NAME, 'nt_pager_selection'))
    rows_p_page.select_by_visible_text(str(entries))

    # driver.find_element(By.CSS_SELECTOR, '[data-page="last"] .footable-page-link').click()
    # time.sleep(1)
    try:
        rows =  WebDriverWait(driver, 10).until(
            lambda drive: drive.find_elements(By.CSS_SELECTOR, "#footable_544 tbody tr")
            if len(drive.find_elements(By.CSS_SELECTOR, "#footable_544 tbody tr")) == entries else None
        )
    except Exception:
        print("Table does not exist?")
        rows = driver.find_elements(By.CSS_SELECTOR, "#footable_544 tbody tr")
    
    for anime_row in rows:
        anime_row.find_element(By.CLASS_NAME, 'footable-toggle').click()
    
    anime_details_tables = WebDriverWait(driver, 60).until(
         lambda drive: drive.find_elements(By.CLASS_NAME, 'footable-detail-row')
     )

    for anime_list, anime_details in zip(rows, anime_details_tables):
        table = anime_details.find_elements(By.CSS_SELECTOR, 'tbody tr')
        entry = anime_list.text.split('\n')
        if len(entry) == 4:
            df_list.append({
                'Title': entry[0],
                'Song': entry[1],
                'Artist': entry[2],
                'Relation': entry[3],
            })

        for j, row in enumerate(table):
            if row.get_attribute('class') != 'nt_has_hide':
                entry = row.text.split('\n')
                if (entry[0] + entry[1]) == 'ArtistJapanese': df_list[-1]['Artist Japanese'] = entry[2]
                if (entry[0] + entry[1]) == 'AnimeEnglish': df_list[-1]['Anime English'] = entry[2]

    if i < 21:
        driver.find_element(By.CSS_SELECTOR, '[data-page="next"] .footable-page-link').click()
        time.sleep(1)
    print(i)
df = pd.DataFrame(df_list)
print(df.loc[:, :])
df.to_csv("animedb")
    # print(rows[0].find_element(By.CSS_SELECTOR, '.ninja_column_2 .animeRow a').get_attribute('data-content'))
    # print(rows[0].find_element(By.CLASS_NAME, '.ninja_column_3 .animeRow a').find_element(By.CLASS_NAME, 'animeRow').get_property('data-content'))

time.sleep(60)
"""
driver.find_element(By.NAME, value="SSO_Signin").click()


frame = driver.find_element(By.ID, "duo_iframe")
driver.switch_to.frame(frame)
driver.find_element(By.NAME, value="dampen_choice").click()
driver.find_element(By.CLASS_NAME, "push-label").find_element(By.TAG_NAME, "button").click()
time.sleep(5)

driver.switch_to.default_content()
driver.find_element(By.ID, value="win0divPTNUI_LAND_REC_GROUPLET$2").click()
driver.find_element(By.XPATH, value="//*[text()='Shopping Cart']").click()


class1_closed = True
class2_closed = True
while class1_closed and class2_closed:
    time.sleep(600)
    driver.find_element(By.XPATH, value="//*[text()='Shopping Cart']").click()
    time.sleep(10)
    print("Checking...")
    print(time.strftime("%I:%M:%S", time.localtime()))
    if driver.find_element(By.ID, value="win10divDERIVED_SSR_FL_SSR_AVAIL_FL$3").text != "Closed":
        class1_closed = False
    if driver.find_element(By.ID, value="win10divDERIVED_SSR_FL_SSR_AVAIL_FL$4").text != "Closed":
        class2_closed = False

driver.find_element(By.XPATH, value="//*[text()='Modify Classes']").click()
time.sleep(1)
driver.find_element(By.XPATH, value="//*[text()='Swap Classes']").click()
time.sleep(3)
driver.find_element(By.XPATH, value="//*[text()='Spring 2024']").click()
time.sleep(8)

dropdown = driver.find_element(By.ID, "DERIVED_REGFRM1_SSR_CLASSNAME_35")
if not class2_closed:
    Select(dropdown).select_by_value("6621")
elif not class1_closed:
    Select(dropdown).select_by_value("5833")
time.sleep(1)

Select(driver.find_element(By.ID, "DERIVED_REGFRM1_DESCR50$4$")).select_by_value("5831")
driver.find_element(By.XPATH, value="//*[text()='Swap']").click()
time.sleep(3)
driver.find_element(By.XPATH, value="//*[text()='Submit']").click()
time.sleep(3)
driver.find_element(By.XPATH, value="//*[text()='Yes']").click()
time.sleep(3)
print("Class Changed!")
driver.quit()
"""